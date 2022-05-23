<script>
    import Node from "./components/Node.svelte";
    import Edge from "./components/Edge.svelte";
    import Info from "./components/Info.svelte";
    import { uid } from "./math.js";
    let nodes = [];
    let edges = [];

    function createNode(e) {
        if (e.target.nodeName !== "MAIN") return;
        const node = {
            id: uid(),
            x: e.clientX,
            y: e.clientY,
            size: 30,
            color: "#ff0000",
        };
        nodes = [...nodes, node];
    }

    function deleteNode(node) {
        nodes = nodes.filter((otherNode) => otherNode != node);
        edges = edges.filter(
            (edge) => edge.start != node && edge.end != node
        );
    }

    let selected = null;

    function startEdge(node, type) {
        if (!selected) {
            selected = { node, type };
        }
    }

    function finishEdge(node) {
        if (selected && selected.node != node) {
            const edge = {
                id: uid(),
                start: selected.node,
                end: node,
                type: selected.type,
            };
            selected = null;
            edges = [...edges, edge];
        }
    }

    function deleteEdge(edge) {
        edges = edges.filter((otherEdge) => otherEdge != edge);
    }

    $: if (nodes) edges = edges;
</script>

<main on:click={createNode}>
    {#each edges as edge (edge.id)}
        <Edge {edge} on:delete={() => deleteEdge(edge)} />
    {/each}
    {#each nodes as node (node.id)}
        <Node
            bind:node
            on:delete={() => deleteNode(node)}
            on:startEdge={(e) => startEdge(node, e.detail)}
            on:finishEdge={() => finishEdge(node)}
        />
    {/each}
</main>
<Info />

<style>
    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    :global(body) {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }
    main {
        height: 100vh;
        position: relative;
    }
    :global(.button) {
        background: none;
        outline: none;
        border: none;
        font-family: inherit;
        font-size: inherit;
        cursor: pointer;
        font-size: 20px;
        color: #aaa;
    }
    :global(.button:hover) {
        color: #000;
    }
    :global(menu) {
        position: absolute;
        padding: 5px 10px;
        background-color: #fff;
        box-shadow: 0px 0px 10px #0006;
        border-radius: 8px;
    }
    :global(.centered) {
        text-align: center;
    }
</style>
