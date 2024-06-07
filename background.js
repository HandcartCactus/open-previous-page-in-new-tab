/**
 * Function to hit the back button on the given tab
 * @param {Tab} tabInfo - The tab to go back on.
 */
async function goBack(tabInfo) {
    let withGoBack = browser.tabs.goBack(tabInfo.id);
}

/**
 * Function to handle the context menu click event.
 * @param {Object} info - Information about the item clicked and the context where the click happened.
 * @param {Object} tab - The details of the tab where the click took place.
 */
async function openPreviousPage(info, tab) {
    try {
        let duplicated = browser.tabs.duplicate(tab.id, {index: tab.index});
        duplicated.then(goBack, console.log)
    } catch (error) {
        console.error("Error retrieving previous URL:", error);
    }
}

/**
 * Function to create the context menu item.
 */
function createContextMenuItem() {
    browser.contextMenus.create({
        id: "open-previous-page",
        title: "Open Previous Page in New Tab",
        contexts: ["tab"]
    });
}

// Add listener for the context menu click event
browser.contextMenus.onClicked.addListener(openPreviousPage);

// Create the context menu item when the extension is installed or updated
browser.runtime.onInstalled.addListener(createContextMenuItem);
