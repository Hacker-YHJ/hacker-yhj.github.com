(function(){var t,r,n,e,a,i,c,u,s;c=20,s=28*c,a=28*c,i=20,r=0,n=[],u=d3.select("#digitShowcase").append("svg").attr("width",s+2*i).attr("height",a+2*i).append("g").attr("transform","translate("+i+","+i+")"),u.on("click",function(){return t(++r%10)}),t=function(t){return u.selectAll("rect").transition().ease("easeOutElastic").delay(function(t,r){return 10*(~~(r/28)+r%28)}).attr("y",function(t,r){return~~(r/28)*c+8}).attr("x",function(t,r){return r%28*c+8}).attr("width",c-16).attr("height",c-16).style("fill","#000").each("end",function(r,n){return 783===n?e(t):void 0})},e=function(t){var r;return r=n[t],u.selectAll("rect").data(r).enter().append("rect").attr("y",function(t,r){return~~(r/28)*c}).attr("x",function(t,r){return r%28*c}).attr("width",c).attr("height",c).style("fill",function(t){return d3.rgb(t,t,t)}),u.selectAll("rect").transition().ease("easeOutElastic").delay(function(t,r){return 10*(~~(r/28)+r%28)}).attr("y",function(t,r){return~~(r/28)*c}).attr("x",function(t,r){return r%28*c}).attr("width",c).attr("height",c).style("fill",function(t){return d3.rgb(t,t,t)})},d3.text("assets/data/sample_points-a4f1d1150a.csv",function(t,r){if(t)throw t;return n=d3.csv.parseRows(r),[0,1,2,3,4,5,6,7,8,9].forEach(function(t){return n[t].shift()}),e(0)})}).call(this);