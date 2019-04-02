(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore (url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
    }

    this.server_url = url;
  };

  RemoteDataStore.prototype.add = function (key, val) {
    return $.post(this.server_url, val, function (server_response) {
      console.log(server_response);
    });
  };

  RemoteDataStore.prototype.getAll = function (cb) {
    return $.get(this.server_url, function (server_response) {
      if (cb) {
        console.log(server_response);
        cb(server_response);
      }
    });
  };

  RemoteDataStore.prototype.get = function (key, cb) {
    return $.get(this.server_url + '/' + key, function (server_response) {
      if (cb) {
        console.log(server_response);
        cb(server_response);
      }
    });
  };

  RemoteDataStore.prototype.remove = function (key) {
    return $.ajax(this.server_url + '/' + key, {type: 'DELETE'});
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
