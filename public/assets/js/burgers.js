$(function () {
    $(".change-devoured").on("click", (event) => {
        var id = $(this).data("id");
        var newDevour = $(this).data("newdevour");

        var newDevourState = {
            devoured: newDevour
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevourState
        }).then(
            () => {
                console.log("Changed state to", newDevour);
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", (event) => {
        event.preventDefault();

        var newBurger = {
            name: $("#ca").val().trim(),
            devoured: $("[name=devoured]:checked").val().trim()
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            () => {
                console.log("Created a new burger");
                location.reload();
            }
        )
    });

    $(".delete-burger").on("click", (event) => {
        var id = $(this).data("id");

        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(
            () => {
                console.log("Deleted burger", id);
                location.reload();
            }
        );
    });
});;