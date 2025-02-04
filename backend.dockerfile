FROM node:slim

ARG SEARXNG_API_URL

WORKDIR /home/perplexica

COPY src /home/perplexica/src
COPY tsconfig.json /home/perplexica/
COPY config.toml /home/perplexica/
# COPY drizzle.config.ts /home/perplexica/
COPY package.json /home/perplexica/
COPY yarn.lock /home/perplexica/

# ENV CXXFLAGS="-std=c++20"
# ENV npm_config_build_from_source=true

# RUN apt-get update && apt-get install -y \
#     python3 \
#     python-is-python3 \
#     make \
#     gcc \
#     g++

RUN sed -i "s|SEARXNG = \".*\"|SEARXNG = \"${SEARXNG_API_URL}\"|g" /home/perplexica/config.toml

RUN mkdir /home/perplexica/data

RUN yarn install 
RUN yarn build

CMD ["yarn", "start"]