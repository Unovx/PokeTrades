


function RemoveHash() {
    history.pushState("", document.title, window.location.pathname + window.location.search);
}
window.addEventListener("load", () => {
    const rootEl = document.getElementById("root");

    const router = new Navigo("/", { hash: true });

    const clear = (node) => {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }

        return node;
    }

    const render = (view, props) => {
        view.render(clear(rootEl), props);
    }

    router
        .on("/users/:id", async (match) => {
            $(document).ready(function () {
                var id = match.data.id;
                document.querySelector(".PA-Searchbar").value = id;
                searchInfoText = id;
                localStorage.setItem('searchID', searchInfoText);
                $('.MA-SearchTradeShopsImage').click();
                $(".PA-Searchbar").keyup();
                if (document.querySelector(".PA-Searchbar").value == "") {
                    window.location.href = window.location.href.split('#')[0];
                }
            });
        })
        .on((match) => {
            //alert("2")
            //render();
            //alert("HERE");
        })
        .resolve();

    router.notFound(function () {
        //window.location.href = window.location.href.split('#')[0];
        //window.location.href = "https://PokeTrades.org/Temp";
        //render();
        //alert("1");
    })
        .resolve();
});