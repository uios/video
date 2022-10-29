window.api = {
    endpoint: "https://api.uios.computer"
};

window.onload = ()=>{
    api.endpoint = is.local(window.location.href) ? window.location.protocol + "//api.uios.tld" : api.endpoint;

    window.dom = {
        body: document.body,
        boot: document.getElementById("boot")
    };

    var domains = window.location.host.split('.');
    window.global = {
        domains: {
            domain: domains.length > 1 ? domains[domains.length - 2] : null,
            subdomain: domains.length > 2 ? domains[domains.length - 3] : null,
            tld: domains[domains.length - 1]
        }
    }

    dom.body.dataset.load = "ing";

    init();
}

function init() {
    console.log("Initializing...");

    window.rout.ing = function(href, GOT, n, m=GOT[n], root=GOT[0]) {
        return m.includes("#") || (root === 'watch' && n === 1) || (root === 'channel' && n === 1);
    }

    dom.body.dataset.load = "ed";
    dom.body.onclick = (event)=>on.touch.tap(event);

    var url = window.location.pathname;
    if (window.globals.domains.subdomain === "uios") {
        var dir = rout.ed.dir(window.location.pathname);
        dir.splice(0, 1)
        var url = rout.ed.url(dir);
    }

    var uri = ((dom.boot.dataset.path ? dom.boot.dataset.path : url) + (window.location.search + window.location.hash));

    var go = false;
    const authChange = function(e) {
        const load = function(e) {
            dom.body.dataset.load = "ed";
        };
        dom.body.dataset.load = "ed";
    };
    if (window.firebase) {
        firebase.initializeApp(auth.config);
        const onAuthStateChanged = async function(user) {
            if (user) {
                const a = function(d) {
                    const data = JSON.parse(d);
                    const settings = data.settings;
                    if (settings) {
                        const json = settings.json;
                        const theme = json.theme;
                        controller.system.theme(theme);
                    }
                    auth.change(user).then(authChange);
                    go ? null : uri.router().then(function() {
                        go = true;
                        authChange();
                    });
                }
                const jwt = await auth.getIdToken();
                var endpoint = is.local(window.location.href) ? window.location.protocol + "//api.uios.tld" : api.endpoint;
                ajax(endpoint + "/write/account?jwt=" + jwt).then(a);
            } else {
                go ? null : uri.router().then(function() {
                    go = true;
                    authChange();
                });
            }
        }
        firebase.auth().onAuthStateChanged(onAuthStateChanged);
    } else {
        uri.router().then(authChange);
    }

    console.log("Initialized");
}
