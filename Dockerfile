FROM ruby:3.1

ARG FROZEN_MODE=true

WORKDIR /work
COPY . /work

RUN bundle config set --local frozen "$FROZEN_MODE" && \
    bundle install

CMD ["bundle", "exec", "jekyll", "serve", "--incremental", "--host", "0.0.0.0"]
