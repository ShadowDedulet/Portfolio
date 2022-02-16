const addProjectSearchListener = () => {
    let projects = document.getElementsByClassName("project");
    let search = <HTMLInputElement>document.getElementById("search");

    if (search)
        search.addEventListener("input", (_e) => {
            const value = search.value.toLowerCase();
            let projectsArr: Array<HTMLElement> =
                Array.prototype.slice.call(projects);

            // unhide all projects
            projectsArr.forEach((project) => project!.classList.remove("hide"));

            let hidden = projectsArr
                .map((project) => {
                    if (!project.id.includes(value)) return project;
                })
                .filter(Boolean);

            // hide searched projects
            hidden.forEach((project) => project!.classList.add("hide"));
        });
};

export default addProjectSearchListener;
