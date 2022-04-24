


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

    function GetUserInfo(data) {
        if (data != "") {
            searchData = jQuery.parseJSON(data);
            document.querySelector(".PA-Searchbar").value = searchData.user_id;
            searchInfoText = searchData.user_id;
            localStorage.setItem('searchID', searchInfoText);
            $('.MA-SearchTradeShopsImage').click();
            //$(".PA-Searchbar").keyup();
            if (document.querySelector(".PA-Searchbar").value == "") {
                window.location.href = window.location.href.split('#')[0];
            }
        }
    }

    const render = (view, props) => {
        view.render(clear(rootEl), props);
    }

    router
        .on("/users/:uuid", async (match) => {
            $(document).ready(function () {
                var uuid = match.data.uuid;
                $.post(url + "/PHP/get_user_info.php", { uuid: uuid }, GetUserInfo);
            });
        })
        /*.on("/users/:id", async (match) => {
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
        })*/
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