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

  App.ProgressBaseView = Backbone.View.extend({
    initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
    }
  });

  var model = new App.Progress;

  var view1 = new (App.ProgressBaseView.extend({
    initialize: function() {
      var self = this;
      $.contextMenu({
        selector: this.options['menu'],
        items: {
          "up":   {name: "増やす", callback: function(key, opt){ self.model.up(); }},
          "down": {name: "減らす", callback: function(key, opt){ self.model.down(); }},
        },
      });
      App.ProgressBaseView.prototype.initialize.call(this);
    },
    render: function() {
      $(this.el).html(this.model.data());
      return this;
    }
  }))({model: model, el: '#view1', menu: '#menu'});

  view1.render();
});
