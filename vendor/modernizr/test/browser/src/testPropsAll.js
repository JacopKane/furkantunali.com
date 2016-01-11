describe("testPropsAll",function(){var e,t,n,o,i,s={_config:{}},r={_q:[]};before(function(e){i=requirejs.config({context:Math.random().toString().slice(2),baseUrl:"../src",paths:{sinon:"../test/js/lib/sinon",cleanup:"../test/cleanup"}}),define("ModernizrProto",[],function(){return s}),define("Modernizr",[],function(){return r}),define("package",[],function(){return{}}),i(["testDOMProps","testProps","cleanup","sinon"],function(i,s,r,c){t=c.spy(i),n=c.spy(s),o=r,e()})}),beforeEach(function(o){i.undef("testDOMProps"),i.undef("testProps"),t.reset(),n.reset(),define("testDOMProps",function(){return t}),define("testProps",function(){return n}),i(["testPropsAll"],function(i){e=i,expect(t.callCount).to.be(0),expect(n.callCount).to.be(0),o()})}),it("`testProps` is called if `prefixed` is a string",function(){e("display","pfx",void 0,"block"),expect(n.callCount).to.be(1)}),it("`testProps` is called if `prefixed` is undefined",function(){e("display",void 0,void 0,"block"),expect(n.callCount).to.be(1)}),it("`testDOMProps` is called if `prefixed` is anything else",function(){e("display",[],void 0,"block"),expect(t.callCount).to.be(1)}),it("is added to ModernizrProto as `testAllProps`",function(){expect(e).to.equal(s.testAllProps)}),afterEach(function(){i.undef("testPropsAll"),i.undef("testDOMProps"),i.undef("testProps")}),after(function(){o()})});