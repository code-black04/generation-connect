FROM openresty/openresty:alpine-fat

RUN /usr/local/openresty/luajit/bin/luarocks install lua-resty-jwt

# Expose port 80
EXPOSE 80

CMD ["openresty", "-g", "daemon off;"]
