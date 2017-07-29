#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import webapp2
import jinja2
import os
from google.appengine.ext import ndb

template_env = jinja2.Environment(loader=jinja2.FileSystemLoader(os.getcwd()))

class PostModel(ndb.Model):
    n_content = ndb.TextProperty(required=True,default="")

class MainHandler(webapp2.RequestHandler):
    def get(self):
        results = PostModel.query().fetch()
        
        context = {
            'results' : results
        }

        index_template = template_env.get_template('v/index.html')

        index_html = index_template.render(context)

        self.response.write(index_html)

    def post(self):
        PostModel(n_content=self.request.get('content')).put()

        self.redirect('/')

        

app = webapp2.WSGIApplication([
    ('/', MainHandler)
], debug=True)
