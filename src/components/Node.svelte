<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    import { fade } from "svelte/transition";

    export let node;

    let showMenu = false;

    const mouse = { x: 0, y: 0 };

    function initDrag(e) {
        mouse.x = e.clientX ?? e.targetTouches[0].clientX;
        mouse.y = e.clientY ?? e.targetTouches[0].clientY;
        document.onmousemove = document.ontouchmove = drag;
        document.onmouseup = document.ontouchend = endDrag;
    }

    function drag(e) {
        const newX = e.clientX ?? e.targetTouches[0].clientX;
        const newY = e.clientY ?? e.targetTouches[0].clientY;
        node.x += newX - mouse.x;
        node.y += newY - mouse.y;
        mouse.x = newX;
        mouse.y = newY;
        showMenu = false;
    }

    function endDrag() {
        document.onmousemove = document.ontouchmove = null;
        document.onmouseup = document.ontouchend = null;
    }
</script>

<div
    class="node"
    style="--size:{node.size}px;
    left: {node.x - node.size / 2}px;
    top: {node.y - node.size / 2}px"
    on:mousedown={(e) => {
        if (e.target.classList.contains("edit")) return;
        showMenu = !showMenu;
    }}
>
    <div
        class="circle"
        style="background-color: {node.color}"
        on:click={() => dispatch("finishEdge")}
        on:mousedown={initDrag}
        on:touchstart={initDrag}
    />
    {#if showMenu}
        <menu transition:fade={{ duration: 160 }}>
            <div>
                <button
                    on:click={() => dispatch("startEdge", "arrow")}
                >
                    <i class="fa-solid fa-arrow-right" />
                </button>
                <button
                    on:click={() => dispatch("startEdge", "line")}
                >
                    <i class="fa-solid fa-minus" />
                </button>
                <button
                    on:click={() => dispatch("startEdge", "arrows")}
                >
                    <i class="fa-solid fa-arrows-left-right" />
                </button>
                <button on:click={() => dispatch("delete")}>
                    <i class="fa-solid fa-trash-can" />
                </button>
                <label>
                    <i class="fa-solid fa-palette edit" />
                    <input type="color" bind:value={node.color} />
                </label>
            </div>
            <div>
                <input
                    class="edit"
                    type="range"
                    bind:value={node.size}
                    min="5"
                    max="60"
                />
                <small>{node.size}px</small>
            </div>
        </menu>
    {/if}
</div>

<style>
    .node {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 5;
    }

    .node:hover {
        z-index: 10;
    }

    menu {
        left: 100%;
        width: 160px;
        margin-left: 10px;
    }

    menu > div {
        display: flex;
        justify-content: space-between;
        padding: 5px 0px;
    }

    .circle {
        border-radius: 50%;
        width: var(--size);
        height: var(--size);
        cursor: pointer;
    }

    input[type="color"] {
        display: none;
    }
    input[type="range"] {
        width: 100%;
    }
    small {
        margin-left: 10px;
        color: #444;
    }
</style>
