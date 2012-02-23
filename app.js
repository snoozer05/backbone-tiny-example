$(function(){
  window.App = {};

  App.Progress = Backbone.Model.extend({
    defaults: {
      value: 10,
    },
    up: function() {
      this.set("value", this.get("value")+5);
    },
    down: function() {
      this.set("value", this.get("value")-5);
    },
    data: function() {
      return this.get("value");
    },
  });
});
