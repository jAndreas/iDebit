define(["guitools","deferred","mediator","tools"],function(e,t,n,r){function u(){console.log("header.js init"),o=e.cacheNodes(s.className("header")[0])}function a(){}var i=Object.create(null),s=e.By,o;return r.mixin(i).with({init:u,destroy:a}),i})