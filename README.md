# Bootc Dashboard Bootstrap

Foundational early GitOps bootc base image infrastructure and automated build pipeline for host bootstrapping. Built on CentOS Stream 9 bootc (`quay.io/centos-bootc/centos-bootc:stream9`), this image provides automatic system update polling via `bootc-fetch-apply-updates.timer` and SSH public key provisioning for initial remote host administration.

---

## Overview & Target Architecture

| Attribute | Specification |
| :--- | :--- |
| **Target Image Name** | Bootc Dashboard Bootstrap |
| **Supported Architectures** | `linux/amd64`, `linux/arm64` |
| **Base Image** | `quay.io/centos-bootc/centos-bootc:stream9` |
| **Container Registry Target** | `ghcr.io/lanark-house/dashboards` |
| **Manifest Tag Strategy** | Unified multi-arch manifest tag (`latest`, `sha-<commit_sha>`) |
| **SSH Public Keys Source** | `https://github.com/sparksis.keys` |
| **Auto-Update Service** | `bootc-fetch-apply-updates.timer` (systemd) |

---

## Host Provisioning & Lifecycle

### 1. Building Locally

You can build the base image locally using Podman or Docker:

```bash
# Build multi-arch or single arch locally with Podman
podman build -t ghcr.io/lanark-house/dashboards:latest -f Containerfile .
```

### 2. Flashing & Installing via `bootc install`

To provision a target physical host or virtual machine with `bootc`:

#### Installing to a Target Disk from a Live Environment
```bash
podman run --privileged --pid=host -v /dev:/dev -v /var/lib/containers:/var/lib/containers \
  ghcr.io/lanark-house/dashboards:latest bootc install to-disk /dev/sda
```

#### Generating a Disk Image with `bootc-image-builder`
```bash
podman run \
  --rm \
  --privileged \
  --security-opt label=type:unconfined_t \
  -v /var/lib/containers/storage:/var/lib/containers/storage \
  -v $(pwd)/output:/output \
  quay.io/bootc/bootc-image-builder:latest \
  --type qcow2 \
  --local \
  ghcr.io/lanark-house/dashboards:latest
```

### 3. Remote Administration & SSH Access

* Authorized public SSH keys are automatically pulled during image build from `https://github.com/sparksis.keys` and stored at `/root/.ssh/authorized_keys` with `0600` permissions.
* Root SSH key authentication is permitted via drop-in config `/etc/ssh/sshd_config.d/40-bootstrap.conf` (`PermitRootLogin prohibit-password`). Password authentication for root remains disabled.

### 4. Automatic Update Operations

* The systemd timer `bootc-fetch-apply-updates.timer` is enabled by default.
* It periodically polls `ghcr.io/lanark-house/dashboards:latest` for updated container layers.
* When a new multi-arch container image manifest is pushed to `main`, running hosts download the delta and stage updates for seamless reboot application.

---

## Web Dashboard Framework Integration

This repository also contains the Next.js 9:16 vertical portrait dashboard application designed to run atop bootc host installations.

### Local Dashboard Development

```bash
# Install dependencies
pnpm install

# Start Next.js development server
pnpm dev

# Build production Next.js assets
pnpm run build

# Run Storybook component catalog
pnpm run storybook
```

---

## Documentation Links

* [Backstage Catalog Entity](catalog-info.yaml)
* [Style Guide](STYLE_GUIDE.md)
* [Contributing Guide](CONTRIBUTING.md)
* [License](UNLICENSE)
