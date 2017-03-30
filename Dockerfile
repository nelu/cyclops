############################################################################
# The contents of this file are subject to the CYPHON Proprietary Non-
# Commercial Registered User Use License Agreement (the "Agreement”). You
# may not use this file except in compliance with the Agreement, a copy
# of which may be found at https://github.com/dunbarcyber/cyclops/. The
# developer of the CYPHON technology and platform is Dunbar Security
# Systems, Inc.
#
# The CYPHON technology or platform are distributed under the Agreement on
# an “AS IS” basis, WITHOUT WARRANTY OF ANY KIND, either express or
# implied. See the Agreement for specific terms.
#
# Copyright (C) 2017 Dunbar Security Solutions, Inc. All Rights Reserved.
#
# Contributor/Change Made By: ________________. [Only apply if changes
# are made]
############################################################################

FROM node:7.4

MAINTAINER Chase Brewer <chase.brewer@dunbarsecured.com>

ENV CYCLOPS_HOME=/usr/src/app/cyclops
ENV CYCLOPS_PORT=3000

# create unprivileged user
RUN groupadd -r cyclops && useradd -r -g cyclops cyclops

# create application directory
RUN mkdir -p $CYCLOPS_HOME

# copy project to the image
COPY . $CYCLOPS_HOME

# change to project directory
WORKDIR $CYCLOPS_HOME

# install node modules and compile source files
RUN npm install && npm run build

EXPOSE $CYCLOPS_PORT

# start the server
CMD npm run server:prod "$@"
