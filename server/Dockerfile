FROM rustlang/rust:nightly as builder

WORKDIR /app

# Copy Cargo files
COPY Cargo.toml Cargo.lock ./
COPY ./src /app/src
COPY ./static /app/static

# Build release binary
RUN cargo build --release

EXPOSE 3001
CMD ["/app/target/release/time-snap"]
