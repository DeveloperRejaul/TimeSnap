use rdev::{listen, Event, EventType, simulate, Key};
use enigo::{Enigo, Keyboard, Settings};

pub fn press_key(text: &str) -> Result<(), String> {
    let key = match text {
       // Letters
        "a" => Key::KeyA,
        "b" => Key::KeyB,
        "c" => Key::KeyC,
        "d" => Key::KeyD,
        "e" => Key::KeyE,
        "f" => Key::KeyF,
        "g" => Key::KeyG,
        "h" => Key::KeyH,
        "i" => Key::KeyI,
        "j" => Key::KeyJ,
        "k" => Key::KeyK,
        "l" => Key::KeyL,
        "m" => Key::KeyM,
        "n" => Key::KeyN,
        "o" => Key::KeyO,
        "p" => Key::KeyP,
        "q" => Key::KeyQ,
        "r" => Key::KeyR,
        "s" => Key::KeyS,
        "t" => Key::KeyT,
        "u" => Key::KeyU,
        "v" => Key::KeyV,
        "w" => Key::KeyW,
        "x" => Key::KeyX,
        "y" => Key::KeyY,
        "z" => Key::KeyZ,

        // Numbers
        "0" => Key::Num0,
        "1" => Key::Num1,
        "2" => Key::Num2,
        "3" => Key::Num3,
        "4" => Key::Num4,
        "5" => Key::Num5,
        "6" => Key::Num6,
        "7" => Key::Num7,
        "8" => Key::Num8,
        "9" => Key::Num9,

        // Modifiers
        "shift" => Key::ShiftLeft,
        "shiftleft" => Key::ShiftLeft,
        "shiftright" => Key::ShiftRight,
        "control" | "ctrl" => Key::ControlLeft,
        "alt" => Key::Alt,
        "altgr" => Key::AltGr,
        "meta" | "command" | "windows" => Key::MetaLeft,
        "capslock" => Key::CapsLock,
        "numlock" => Key::NumLock,
        "scrolllock" => Key::ScrollLock,

        // Navigation
        "enter" | "return" => Key::Return,
        "space" => Key::Space,
        "tab" => Key::Tab,
        "backspace" => Key::Backspace,
        "escape" | "esc" => Key::Escape,
        "home" => Key::Home,
        "end" => Key::End,
        "pageup" => Key::PageUp,
        "pagedown" => Key::PageDown,
        "insert" => Key::Insert,
        "delete" => Key::Delete,
        "up" | "uparrow" => Key::UpArrow,
        "down" | "downarrow" => Key::DownArrow,
        "left" | "leftarrow" => Key::LeftArrow,
        "right" | "rightarrow" => Key::RightArrow,

        // Function keys
        "f1" => Key::F1,
        "f2" => Key::F2,
        "f3" => Key::F3,
        "f4" => Key::F4,
        "f5" => Key::F5,
        "f6" => Key::F6,
        "f7" => Key::F7,
        "f8" => Key::F8,
        "f9" => Key::F9,
        "f10" => Key::F10,
        "f11" => Key::F11,
        "f12" => Key::F12,

        // Punctuation / Symbols
        "backquote" => Key::BackQuote,
        "minus" => Key::Minus,
        "equal" => Key::Equal,
        "leftbracket" => Key::LeftBracket,
        "rightbracket" => Key::RightBracket,
        "semicolon" => Key::SemiColon,
        "quote" => Key::Quote,
        "backslash" => Key::BackSlash,
        "intlbackslash" => Key::IntlBackslash,
        "comma" => Key::Comma,
        "dot" => Key::Dot,
        "slash" => Key::Slash,

        // Numpad
        "kp0" => Key::Kp0,
        "kp1" => Key::Kp1,
        "kp2" => Key::Kp2,
        "kp3" => Key::Kp3,
        "kp4" => Key::Kp4,
        "kp5" => Key::Kp5,
        "kp6" => Key::Kp6,
        "kp7" => Key::Kp7,
        "kp8" => Key::Kp8,
        "kp9" => Key::Kp9,
        "kpreturn" => Key::KpReturn,
        "kpminus" => Key::KpMinus,
        "kpplus" => Key::KpPlus,
        "kpmultiply" => Key::KpMultiply,
        "kpdivide" => Key::KpDivide,
        "kpdelete" => Key::KpDelete,

        // Default case
        _ => return Err(format!("Unknown key: {}", text)),
    };
    simulate(&EventType::KeyPress(key)).map_err(|e| e.to_string())?; 
    simulate(&EventType::KeyRelease(key)).map_err(|e| e.to_string())?; 
    Ok(()) 
}


pub fn type_string (text: &str) -> Result<(), String> {
    let mut enigo = Enigo::new(&Settings::default()) .map_err(|e| format!("Failed to create Enigo: {:?}", e))?;
    let _ = enigo.text(&text).map_err(|e| format!("Failed to type text: {:?}", e))?;
    Ok(())
}