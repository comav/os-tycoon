function changeTab (tabId) {
    let tabs = Array.from(document.getElementsByClassName('tab'));
    currentTab = document.getElementById(tabId);
    for (let i = 0; i<tabs.length; i++) {
        console.log('jjjj', tabs[i])
        tabs[i].style.display = 'none';
    }
    currentTab.style.display = 'block';
}

changeTab("home");