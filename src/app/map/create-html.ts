export function createHtmlByData(data, title): string {
    let vcdHtml = ``;
    data.forEach((vcd, index) => {
        let first = ``;
        if(index == 0) {
            first = `<input type="radio" style="margin: 5px;" checked data-site="${vcd.site}" onclick="
                        let doms = document.querySelectorAll('[type=radio]');
                        for(let i = 0, len = doms.length; i < len; ++i) {
                            doms[i].checked = false;
                            this.checked = true;
                        }
                    "
                    />`;
        }else {
            first = `<input type="radio" style="margin: 5px;" data-site="${vcd.site}" onclick="
                        let doms = document.querySelectorAll('[type=radio]');
                        for(let i = 0, len = doms.length; i < len; ++i) {
                            doms[i].checked = false;
                            this.checked = true;
                        }
                    "
                    />`;
        }
        vcdHtml += `
            <div class="vcd-info-style">
                    <div class="bottom-border">
                        <div class="row" style="margin-left: -18px;">` +
                            first +
                            `
                            <h5 style="margin-top: -2px;">${vcd.name}</h5>
                        </div>
                        <h5 style="margin-top: 0;"><span>${vcd.site}</span></h5>
                    </div>
                    <div class="bottom-border">
                        <h5><span>${vcd.orgs}</span></h5>
                    </div>
                    <div class="bottom-border">
                        <h5><span>${vcd.errors}</span></h5>
                    </div>
                    <div>
                        <h5>
                            <span class="badge badge-danger"></span>
                            <span>${vcd.status}</span>
                        </h5>
                    </div>
            </div>
        `
    });
    let html = `
        <div aria-hidden="true">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Overview - ${title}</h3>
                </div>
                <div class="modal-body row row-nowrap" style="overflow-x: hidden;">
                    <div class="vcd-info-style">
                        <div><h5><b>DR vCD </b></h5></div>
                        <div><h5><b># of Orgs </b></h5></div>
                        <div><h5><b># of Replications in Error </b></h5></div>
                        <div><h5><b>System Status </b></h5></div>
                    </div>
                    <div class="row row-nowrap">`
                     +
                    vcdHtml +
                `
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="
                        let doms = document.querySelectorAll('[type=radio]');
                        let site = '';
                        for(let i = 0, len = doms.length; i < len; ++i) {
                            let chosen = doms[i].checked;
                            if(chosen == true) {
                                site = doms[i].getAttribute('data-site');
                                break;
                            }
                        }
                        if(site) window.open('http://' + site);
                    " >Enter</button>
                </div>
            </div>
        </div>
    `;
    return html;
}