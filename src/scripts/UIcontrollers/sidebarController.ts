const sidebarController = (): void => {
	const toggleBtnController = document.querySelector<HTMLElement>("#active_side_menu");
    console.log(toggleBtnController)
	const sidebar = document.querySelector<HTMLElement>(".sidebar");
	toggleBtnController.addEventListener("click", () => {
		sidebar.classList.toggle("active");
        console.log("click")
	});
    console.log("sidebarController created")
};

sidebarController();