<script>
    import { angle, length } from "../math.js";
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";
    export let edge;
    const dispatch = createEventDispatcher();
    $: startPos = {
        x: edge.start.x,
        y: edge.start.y,
    };
    $: endPos = {
        x: edge.end.x,
        y: edge.end.y,
    };
    $: len = length(startPos, endPos);
    $: ang = angle(startPos, endPos);
    const thickness = 16;
    let showMenu = false;
</script>

<div
    on:mousedown={(e) => {
        if (e.target.nodeName != "I") showMenu = !showMenu;
    }}
    class="edge {edge.type}"
    style="width: {len}px; height: {thickness}px;
    transform:
    translateX({startPos.x}px) 
    translateY({startPos.y - thickness / 2}px) 
    rotate({ang}deg);
    --start-node-size: {edge.start.size}px;
    --end-node-size: {edge.end.size}px"
>
    <div class="line" />
    {#if showMenu}
        <menu
            transition:fade={{ duration: 160 }}
            style="transform: rotate({-ang}deg)"
        >
            <button on:click={() => dispatch("delete")}>
                <i class="fa-solid fa-trash-can" />
            </button>
        </menu>
    {/if}
</div>

<style>
    .edge {
        --color: #222;
        position: absolute;
        transform-origin: left;
        cursor: pointer;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: calc(0.5 * var(--start-node-size));
        padding-right: calc(0.5 * var(--end-node-size));
    }

    .edge .line {
        width: 100%;
        height: 2px;
        background-color: var(--color);
        display: flex;
        align-items: center;
    }

    .edge.arrow .line::after,
    .edge.arrows .line::after {
        content: "";
        position: absolute;
        right: calc(0.5 * var(--end-node-size));
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 20px solid var(--color);
    }

    .edge.arrows .line::before {
        content: "";
        position: absolute;
        left: calc(0.5 * var(--start-node-size));
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-right: 20px solid var(--color);
    }
</style>
