<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    import { fade } from "svelte/transition";
    export let node;
    export let showMenu;
</script>

{#if showMenu}
    <menu transition:fade={{ duration: 160 }}>
        <div>
            <button
                title="start arrow here"
                class="button"
                on:click={() => dispatch("startEdge", "arrow")}
            >
                <i class="fa-solid fa-arrow-right" />
            </button>
            <button
                title="start line here"
                class="button"
                on:click={() => dispatch("startEdge", "line")}
            >
                <i class="fa-solid fa-minus" />
            </button>
            <button
                title="start two-sided arrow here"
                class="button"
                on:click={() => dispatch("startEdge", "arrows")}
            >
                <i class="fa-solid fa-arrows-left-right" />
            </button>
            <button
                title="remove node"
                class="button"
                on:click={() => dispatch("delete")}
            >
                <i class="fa-solid fa-trash-can" />
            </button>
            <label title="change color" class="button">
                <i class="fa-solid fa-palette edit" />
                <input type="color" bind:value={node.color} />
            </label>
        </div>
        <div>
            <input
                title="change size"
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

<style>
    menu {
        left: calc(100% + 10px);
    }

    div {
        display: flex;
        justify-content: space-between;
        gap: 14px;
        padding: 5px 0px;
    }

    input[type="color"] {
        display: none;
    }

    small {
        color: #444;
    }
</style>
