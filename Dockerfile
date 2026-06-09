FROM ruby:3.2

ARG FROZEN_MODE=true

WORKDIR /work
COPY . /work

RUN gem update --system && \
    gem install bundler -v 4.0.13

RUN bundle config set --local frozen "$FROZEN_MODE" && \
    bundle install

CMD ["bundle", "exec", "jekyll", "serve", "--incremental", "--host", "0.0.0.0"]
