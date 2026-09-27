FROM quay.io/centos-bootc/centos-bootc:stream9

# Provision SSH public keys for root user administration
RUN mkdir -p /root/.ssh && \
    chmod 0700 /root/.ssh && \
    curl -fsSL https://github.com/sparksis.keys -o /root/.ssh/authorized_keys && \
    chmod 0600 /root/.ssh/authorized_keys

# Configure SSH drop-in to permit key-based root login
RUN mkdir -p /etc/ssh/sshd_config.d && \
    echo "PermitRootLogin prohibit-password" > /etc/ssh/sshd_config.d/40-bootstrap.conf

# Enable automatic update monitoring via bootc systemd timer
RUN systemctl enable bootc-fetch-apply-updates.timer

# Clean temporary build artifacts and cache to optimize layer size
RUN rm -rf /tmp/* /var/tmp/* /var/cache/dnf/*
