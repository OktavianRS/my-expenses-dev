setTimeout(function menu() {
	var menuEl = document.getElementById('ml-menu'),
		mlmenu = new MLMenu(menuEl, {
			// breadcrumbsCtrl : true, // show breadcrumbs
			// initialBreadcrumb : 'all', // initial breadcrumb text
			backCtrl : false, // show back button
			// itemsDelayInterval : 60, // delay between each menu item sliding animation
			onItemClick: loadDummyData // callback: item that doesn´t have a submenu gets clicked - onItemClick([event], [inner HTML of the clicked item])
		});

	// mobile menu toggle
	var openMenuCtrl = document.querySelector('.action--open'),
		closeMenuCtrl = document.querySelector('.action--close');

	openMenuCtrl.addEventListener('click', openMenu);
	closeMenuCtrl.addEventListener('click', closeMenu);

	function openMenu() {
		classie.add(menuEl, 'menu--open');
	}

	function closeMenu() {
		classie.remove(menuEl, 'menu--open');
	}

	// simulate grid content loading
	var gridWrapper = document.querySelector('.content');

	function loadDummyData(ev, itemName) {
        if (itemName !== 'Add new') {
                    document.querySelector('.info').innerHTML = itemName;
        }
	}
    var $preloader = $('#pagePreloader'),
    $spinner   = $('#spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');
}, 3000);

