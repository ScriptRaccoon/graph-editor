<script>
    import { angle, distance } from "../math.js";
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";
    export let edge;
    const dispatch = createEventDispatcher();
    $: length = distance(edge.start, edge.end);
    $: edgeAngle = angle(edge.start, edge.end);
    const threshold = 16;
    let showMenu = false;
</script>

<div
    on:mousedown={() => (showMenu = !showMenu)}
    class="edge {edge.type}"
    style="width: {length}px;
    height: {threshold}px;
    transform:
    translateX({edge.start.x}px) 
    translateY({edge.start.y - threshold / 2}px) 
    rotate({edgeAngle}deg);
    --start-node-size: {edge.start.size}px;
    --end-node-size: {edge.end.size}px"
>
    <div class="line" />
    {#if showMenu}
        <menu
            transition:fade={{ duration: 160 }}
            style="transform: rotate({-edgeAngle}deg)"
        >
            <button
                class="button"
                on:click={() => dispatch("delete")}
            >
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
