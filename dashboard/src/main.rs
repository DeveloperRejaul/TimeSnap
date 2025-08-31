use dioxus::prelude::*;

const FAVICON: Asset = asset!("/assets/favicon.ico");
const TAILWIND_CSS: Asset = asset!("/assets/output.css");
// const HEADER_SVG: Asset = asset!("/assets/header.svg");

fn main() {
    dioxus::launch(App);
}

#[component]
fn App() -> Element {
    rsx! {
        document::Link { rel: "icon", href: FAVICON }
        document::Link { rel: "stylesheet", href: TAILWIND_CSS }
        Hero {}
    }
}

#[component]
pub fn Hero() -> Element {
    rsx! {
        h1 { class: "text-5xl font-bold text-center mt-20 text-red-500", "Welcome to TimeSnap" }
    }
}
