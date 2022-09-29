window.mvc ? null : (window.mvc = {});

window.mvc.m ? null : (window.mvc.m = model = {
    error: {
        image: e=>{
            console.log('model.error.image', e);
            e.remove();
        }
    },
    time: {
        date: (timestamp)=>{
            const rtf = new Intl.RelativeTimeFormat('en',{
                numeric: 'always',
            });
            const oneDayInMs = 1000 * 60 * 60 * 24;
            const daysDifference = Math.round((timestamp - new Date().getTime()) / oneDayInMs, );

            const formatted = isNaN(daysDifference) ? "" : rtf.format(daysDifference, 'day');
            return formatted;
        }
    }
});

window.mvc.v ? null : (window.mvc.v = view = function(route) {
    console.log(108, {
        route
    });

    return new Promise(async function(resolve, reject) {
        var page = route.page;
        var path = route.path;
        var gut = route.hash ? rout.ed.dir(route.hash.split('#')[1]) : [];
        var get = (route ? route.GOT : rout.ed.dir(dom.body.dataset.path)).concat(gut);
        var root = get[0] || gut[0];

        window.GET = window.GET ? GET : rout.ed.dir(dom.body.dataset.path);

        if (root) {

            if (root === "feed") {
                resolve(route);
            } else if (root === "watch") {
                if(get[1]) {
                    var vp = dom.body.find('[data-page="/watch/*/"]');
                    var iframe = vp.find('iframe');
                    const uid = get[1];
                    var endpoint = "/watch/" + uid + ".json";
                    const a = (d) => {
                        const data = JSON.parse(d);
                        console.log(data);
                        iframe.src = "https://youtube.com/embed/" + data.source;
                    }
                    const b = (error) => {
                        endpoint = api.endpoint + "/video/watch/" + uid;
                        alert("There was an error loading this video.");
                    }
                    ajax(endpoint).then(a).catch(b);
                }
                resolve(route);
            } else {
                resolve(route);
            }

        } else {
            resolve(route);
        }
    }
    );
}
);

window.mvc.c ? null : (window.mvc.c = controller = {
    system: {
        theme: type=>{
            window.tS = event=>{
                if (event.matches) {
                    document.body.dataset.theme = "dark";
                } else {
                    document.body.removeAttribute('data-theme');
                }
            }
            if (type === "system") {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.body.dataset.theme = "dark";
                } else {
                    document.body.removeAttribute('data-theme');
                }
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', tS);
            } else {
                window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', tS);
            }

            if (type === "auto") {
                controller.system.time();
            } else {
                if (window.timer) {
                    clearTimeout(window.timer);
                    window.timer = 0;
                }
            }

            if (type === "light") {
                document.body.removeAttribute('data-theme');
            }

            if (type === "dark") {
                document.body.dataset.theme = "dark";
            }
        }
    }
});
