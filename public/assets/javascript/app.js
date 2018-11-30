$(document).ready(function () {
    $("#add-burger").on("click", function (e) {
        e.preventDefault();
        var newBurger = {
            burger_name: $("#customized-burger [name=customize]").val().trim(),
            devoured: -1
        }
        console.log(newBurger);
        $.ajax("/add-burger", {
            type: "POST",
            data: newBurger
        }).then(function () {

            console.log("added burger!");
            location.reload();
        });
    });

    $(".devour").on("click", function () {

        var id = $(this).data("id");

        var updateBurger = {
            devoured: 0,
        }
        $.ajax("/update/" + id, {
            type: "PUT",
            data: updateBurger
        }).then(function () {
            console.log("updated burger");
            location.reload();
        })
    })

    $(".delete").on("click", function () {

        var id = $(this).data("id");

        $.ajax("/delete/" + id, {
            type: "DELETE"
        }).then(function () {
            console.log("Deleted Burger...");
            location.reload();
        })
    })


})
