<script>
    import Node from "./components/Node.svelte";
    import Edge from "./components/Edge.svelte";
    import Help from "./components/Help.svelte";
    let nodes = [];
    let edges = [];

    let edgeIndex = 0;

    function createNode(e) {
        if (e.target.nodeName !== "MAIN") return;
        const size = 30;
        const newNode = {
            x: e.clientX,
            y: e.clientY,
            size: size,
            color: "#ff0000",
        };
        nodes = [...nodes, newNode];
    }

    function deleteNode(node) {
        nodes = nodes.filter((otherNode) => otherNode != node);
        edges = edges.filter(
            (edge) => edge.start != node && edge.end != node
        );
    }

    let selection = null;

    function startEdge(node, type) {
        if (!selection) {
            selection = { node, type };
        }
    }

    function finishEdge(node) {
        if (selection && selection.node != node) {
            edgeIndex++;
            const newEdge = {
                index: edgeIndex,
                start: selection.node,
                end: node,
                type: selection.type,
            };
            selection = null;
            edges = [...edges, newEdge];
        }
    }

    function deleteEdge(edge) {
        edges = edges.filter((otherEdge) => otherEdge != edge);
    }

    $: if (nodes) edges = edges;
</script>

<main on:click={createNode}>
    {#each edges as edge (edge.index)}
        <Edge {edge} on:delete={() => deleteEdge(edge)} />
    {/each}
    {#each nodes as node}
        <Node
            bind:node
            on:delete={() => deleteNode(node)}
            on:startEdge={(e) => startEdge(node, e.detail)}
            on:finishEdge={() => finishEdge(node)}
        />
    {/each}
</main>
<Help />

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
    :global(button, label) {
        background: none;
        outline: none;
        border: none;
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        cursor: pointer;
        font-size: 20px;
        color: #aaa;
        text-shadow: 0px 0px 5px #fff;
    }
    :global(button:hover, button:focus, label:hover, label:focus) {
        color: #000;
    }

    :global(menu) {
        position: absolute;
        padding: 5px 10px;
        background-color: #fff;
        box-shadow: 0px 0px 10px #0006;
        border-radius: 8px;
    }
</style>
