FROM ruby:3.1

WORKDIR /work
COPY . /work

RUN bundle install

CMD ["bundle", "exec", "jekyll", "serve", "--incremental", "--host", "0.0.0.0"]
