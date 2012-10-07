define([],function(){function e(e){return Object.prototype.toString.call(e)==="[object Array]"}function t(t,n){if(e(t))for(var r=0;r<t.length;r++)n(t[r]);else n(t)}function n(r){var i="pending",s=[],o=[],u=[],a=null,f={done:function(){for(var t=0;t<arguments.length;t++){if(!arguments[t])continue;if(e(arguments[t])){var n=arguments[t];for(var r=0;r<n.length;r++)i==="resolved"&&n[r].apply(this,a),s.push(n[r])}else i==="resolved"&&arguments[t].apply(this,a),s.push(arguments[t])}return this},fail:function(){for(var t=0;t<arguments.length;t++){if(!arguments[t])continue;if(e(arguments[t])){var n=arguments[t];for(var r=0;r<n.length;r++)i==="rejected"&&n[r].apply(this,a),o.push(n[r])}else i==="rejected"&&arguments[t].apply(this,a),o.push(arguments[t])}return this},progress:function(){for(var t=0;t<arguments.length;t++){if(!arguments[t])continue;if(e(arguments[t])){var n=arguments[t];for(var r=0;r<n.length;r++)i=="pending"&&u.push(n[r])}else i==="pending"&&u.push(arguments[t])}return this},then:function(){arguments.length>1&&arguments[1]&&this.fail(arguments[1]),arguments.length>0&&arguments[0]&&this.done(arguments[0]),arguments.length>2&&arguments[2]&&this.progress(arguments[2])},promise:function(e){if(e==null)return f;for(var t in f)e[t]=f[t];return e},state:function(){return i},debug:function(){console.log("[debug]",s,o,i)},isRejected:function(){return i=="rejected"},isResolved:function(){return i=="resolved"},pipe:function(e,r,i){return n(function(n){t(e,function(e){typeof e=="function"?l.done(function(){var t=e.apply(this,arguments);t&&typeof t=="function"?t.promise().then(n.resolve,n.reject,n.notify):n.resolve(t)}):l.done(n.resolve)}),t(r,function(e){typeof e=="function"?l.fail(function(){var t=e.apply(this,arguments);t&&typeof t=="function"?t.promise().then(n.resolve,n.reject,n.notify):n.reject(t)}):l.fail(n.reject)})}).promise()}},l={resolveWith:function(e){if(i=="pending"){i="resolved";var t=a=arguments.length>1?arguments[1]:[];for(var n=0;n<s.length;n++)s[n].apply(e,t)}return this},rejectWith:function(e){if(i=="pending"){i="rejected";var t=a=arguments.length>1?arguments[1]:[];for(var n=0;n<o.length;n++)o[n].apply(e,t)}return this},notifyWith:function(e){if(i=="pending"){var t=a=arguments.length>1?arguments[1]:[];for(var n=0;n<u.length;n++)u[n].apply(e,t)}return this},resolve:function(){return this.resolveWith(this,arguments)},reject:function(){return this.rejectWith(this,arguments)},notify:function(){return this.notifyWith(this,arguments)}},c=f.promise(l);return r&&r.apply(c,[c]),c}return n.when=function(){if(arguments.length<2){var e=arguments.length?arguments[0]:undefined;return e&&typeof e.isResolved=="function"&&typeof e.isRejected=="function"?e.promise():n().resolve(e).promise()}return function(e){var t=n(),r=e.length,i=0,s=new Array(r);for(var o=0;o<e.length;o++)(function(n){e[n].done(function(){s[n]=arguments.length<2?arguments[0]:arguments,++i==r&&t.resolve.apply(t,s)}).fail(function(){t.reject(arguments)})})(o);return t.promise()}(arguments)},n})