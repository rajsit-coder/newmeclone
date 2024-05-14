const detailsElements = document.querySelectorAll('.details');

detailsElements.forEach(function(details) {
    details.querySelector('summary').addEventListener('click', function() {
        if (!details.open) {
            // Close all details elements
            detailsElements.forEach(function(item) {
                if (item !== details && item.open) {
                    item.open = false;
                }
            });
        }
    });
});

function goBack() {
    window.history.back();
}

window.addEventListener('popstate', function(event) {});