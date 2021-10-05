FROM registry.digitalservice.id/proxyjds/library/alpine:3.12

RUN apk add nodejs yarn && rm -rf /var/cache/apk/*

WORKDIR /app

ENV PORT 3003
ENV NODE_ENV production

COPY src/package.json ./

RUN yarn install

COPY src .

COPY docker .

RUN yarn run build

RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
    && mkdir -p /app \
    && chown -R pptruser:pptruser /app 

USER pptruser

EXPOSE ${PORT}

RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]
