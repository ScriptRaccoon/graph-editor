<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    import NodeMenu from "./NodeMenu.svelte";

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
    on:click={(e) => {
        if (e.target.classList.contains("edit")) return;
        showMenu = !showMenu;
    }}
>
    <div
        class="circle"
        style="background-color: {node.color}"
        on:mousedown={() => dispatch("finishEdge")}
        on:mousedown={initDrag}
        on:touchstart={initDrag}
    />
    <NodeMenu bind:showMenu bind:node on:startEdge on:delete />
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

    .circle {
        border-radius: 50%;
        width: var(--size);
        height: var(--size);
        cursor: pointer;
    }
</style>
