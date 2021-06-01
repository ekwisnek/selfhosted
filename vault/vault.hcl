listener "tcp" {
  address       = "192.168.1.66:8200"
  tls_disable = 1
}

storage "file" {
  path = "/mnt/vault/data"
}

api_addr = "http://192.168.1.66:8200"

ui = true