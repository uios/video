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
            } else if (root === "channel") {
                var vp = dom.body.find("[data-page='/channel/*/']");
                var endpoint = "/channel/"+get[1]+".json";
                const a = async(d)=>{
                    const data = JSON.parse(d);
                    const videos = data.videos;
                    if (videos.length > 0) {
                        var v = 0; 
                        var uploads = vp.all('block')[3].firstElementChild;
                        do {
                            var video = videos[v];
                            var card = uploads.children[v];
                            card.dataset.href = "/watch/"+video.uid+"/"
                            card.find('picture').innerHTML = "<img class='height-100pct position-absolute top-0 width-100pct' src='https://img.youtube.com/vi/"+video.source+"/maxresdefault.jpg'>";
                            v++;
                        } while (v < videos.length);
                    }
                }
                const b = (error)=>{
                    console.log(error);
                    alert("There was an error loading this video.");
                }
                ajax("/channel/"+get[1]+".json").then(a).catch(b);
            } else if (root === "watch") {
                if (get[1]) {
                    var vp = dom.body.find('[data-page="/watch/*/"]');
                    var iframe = vp.find('iframe');
                    const uid = get[1];
                    var endpoint = "/watch/" + uid + ".json";
                    const a = (d)=>{
                        const data = JSON.parse(d);
                        iframe.src = "https://youtube.com/embed/" + data.source;
                    }
                    const b = (error)=>{
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

            var vp = dom.body.find('[data-page="/"]');
            var iframe = vp.find('iframe');
            var endpoint = "/search/recent.json";
            const a = async(d)=>{
                const data = JSON.parse(d);
                const videos = data.videos;
                if (videos.length > 0) {
                    const feed = byId('feed-index');
                    feed.innerHTML = "";
                    const template = await ajax('/cdn/html/template/template.video.grid.html');
                    var v = 0;
                    do {
                        const html = new DOMParser().parseFromString(template, 'text/html').body.firstElementChild.cloneNode(true);
                        const video = videos[v];
                        const kind = video.kind;
                        if (kind === "youtube#video") {
                            const source = video.source;
                            const uid = video.uid;
                            const picture = html.find('picture');
                            picture.dataset.href = "/watch/" + uid + "/";
                            picture.find('img').src = "https://i.ytimg.com/vi/" + source + "/hqdefault.jpg";
                            html.find('[data-before="Title"]').textContent = video.title;
                            html.find('[data-before="Channel Name"]').textContent = video.channelName;
                            html.find('[data-before="Channel Name"]').dataset.href = "/channel/" + video.channelId;
                        }
                        feed.insertAdjacentHTML('beforeend', html.outerHTML)
                        v++;
                    } while (v < videos.length);
                }
            }
            const b = (error)=>{
                endpoint = api.endpoint + "/video/watch/" + uid;
                alert("There was an error loading this video.");
            }
            ajax(endpoint).then(a).catch(b);
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
