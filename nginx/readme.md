self sign generate  certificate  commands using openssl

```shall
# just run your nginx dir
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx-selfsigned.key -out  nginx-selfsigned.crt
```

## Using `wrk` (high-performance HTTP benchmarking)

[`wrk`](https://github.com/wg/wrk) is much faster for large-scale tests.

```bash
# Install
sudo apt install wrk        # Ubuntu
brew install wrk            # macOS

# Test
wrk -t12 -c100 -d30s https://localhost/
```

**Flags:**

* `-t12` → threads
* `-c100` → concurrent connections
* `-d30s` → duration (30 seconds here; can adjust)

