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
    }
  });

  App.ProgressView = Backbone.View.extend({
    initialize: function() {
      var self = this;
      $.contextMenu({
        selector: this.options['menu'],
        items: {
          "up":   {name: "増やす", callback: function(key, opt){ self.model.up(); }},
          "down": {name: "減らす", callback: function(key, opt){ self.model.down(); }},
        },
      });
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
    },
    render: function() {
      $(this.el).html(this.model.data());
      return this;
    }
  });

  var model = new App.Progress;
  var view = new App.ProgressView({model: model, el: '#view1', menu: '#menu'});
  view.render();
});
