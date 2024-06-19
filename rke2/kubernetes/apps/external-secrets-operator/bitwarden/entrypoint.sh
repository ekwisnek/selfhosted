#!/bin/bash

set -e

export BW_SESSION=$(bw login ${BW_USER} --passwordenv BW_PASSWORD --raw)

bw unlock --check

printf "\nRunning Bitwarden Server on port 8087...\n"

bw serve --hostname 0.0.0.0 #--disable-origin-protection    