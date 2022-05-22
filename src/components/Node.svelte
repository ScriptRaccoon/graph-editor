<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    import { fade } from "svelte/transition";

    export let node;

    let showMenu = false;

    const mouse = { x: 0, y: 0 };
    const touchPos = { x: 0, y: 0 };

    function initDrag(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        document.onmouseup = endDrag;
        document.onmousemove = drag;
    }

    function drag(e) {
        node.x += e.clientX - mouse.x;
        node.y += e.clientY - mouse.y;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        showMenu = false;
    }

    function endDrag() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function initTouchDrag(e) {
        const touchLocation = e.targetTouches[0];
        touchPos.x = touchLocation.clientX;
        touchPos.y = touchLocation.clientY;
        document.ontouchmove = touchDrag;
        document.ontouchend = endTouchDrag;
    }

    function touchDrag(e) {
        const touchLocation = e.targetTouches[0];
        console.log(touchLocation);
        node.x += touchLocation.clientX - touchPos.x;
        node.y += touchLocation.clientY - touchPos.y;
        touchPos.x = touchLocation.clientX;
        touchPos.y = touchLocation.clientY;
        showMenu = false;
    }

    function endTouchDrag() {
        document.ontouchmove = null;
        document.ontouchend = null;
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
        on:touchstart={initTouchDrag}
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
