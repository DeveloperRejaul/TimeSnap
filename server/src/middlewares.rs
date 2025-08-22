use actix_web::{
    web,
    dev::{forward_ready, Service, ServiceRequest, ServiceResponse, Transform},
    Error, HttpResponse, body::EitherBody,
};
use futures_util::future::{ok, Ready, LocalBoxFuture};
use std::rc::Rc;
use jsonwebtoken::{decode, DecodingKey, Validation};

use crate::models::{Claims, EnvAppConfig};

pub struct Auth;

impl<S, B> Transform<S, ServiceRequest> for Auth
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error> + 'static,
    B: 'static,
{
    type Response = ServiceResponse<EitherBody<B>>;
    type Error = Error;
    type InitError = ();
    type Transform = AuthMiddleware<S>;
    type Future = Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ok(AuthMiddleware {
            service: Rc::new(service),
        })
    }
}

pub struct AuthMiddleware<S> {
    service: Rc<S>,
}

impl<S, B> Service<ServiceRequest> for AuthMiddleware<S>
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error> + 'static,
    B: 'static,
{
    type Response = ServiceResponse<EitherBody<B>>;
    type Error = Error;
    type Future = LocalBoxFuture<'static, Result<Self::Response, Self::Error>>;

    forward_ready!(service);

    fn call(&self, req: ServiceRequest) -> Self::Future {
        let service = Rc::clone(&self.service);

        Box::pin(async move {
            let secret = req
                .app_data::<web::Data<EnvAppConfig>>()   
                .expect("EnvAppConfig not set")         
                .jwt_secret                             
                .clone();
           
            // 🔑 Check Authorization header
            if let Some(auth_header) = req.headers().get("Authorization") {
                if let Ok(auth_str) = auth_header.to_str() {
                    if auth_str.starts_with("Bearer ") {
                        let token = auth_str.trim_start_matches("Bearer ");
                        let validation = Validation::default();

                        let token_data = decode::<Claims>(
                            token,
                            &DecodingKey::from_secret(secret.as_bytes()),
                            &validation,
                        );

                        if token_data.is_ok(){
                            // Allow request
                            return service.call(req).await
                                .map(|res| res.map_into_left_body());
                        }
                    }
                }
            }

            //Unauthorized response
            let res = HttpResponse::Unauthorized().body("Unauthorized");
            Ok(req.into_response(res.map_into_right_body()))
        })
    }
}
