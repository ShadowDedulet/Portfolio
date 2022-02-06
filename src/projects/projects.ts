type Project = {
    name: string;
    url: string;
    description: string;
    tags: Array<string>;
    date: Date;
    dateStr: string;
};

const projects: Array<Project> = [
    {
        name: "Logicer",
        url: "https://bootyass.github.io/Logicer/",
        description:
            "Interactive scheme building sandbox.<br>Create more complicated logic units starting with only 2.",
        tags: ["TypeScript", "JavaScript"],
        date: new Date(2022, 2, 10),
        dateStr: "",
    },
    {
        name: "Pather",
        url: "https://Bootyass.github.io/Pather/",
        description:
            "Interactive pathfinding algorithms visualizer.<br>Add walls, start and end points.<br>Choose pathfinding or mazegeneration algorithms.",
        tags: ["TypeScript", "JavaScript"],
        date: new Date(2022, 1, 11),
        dateStr: "",
    },
];

export type { Project };
export default projects;
