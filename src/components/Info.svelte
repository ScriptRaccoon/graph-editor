<script>
    import { fade } from "svelte/transition";

    let showInfo = false;

    setTimeout(() => {
        showInfo = localStorage.getItem("graph-editor-info-shown")
            ? false
            : true;
        localStorage.setItem("graph-editor-info-shown", 1);
    }, 100);
</script>

<label class="button">
    <i class="fa-solid fa-circle-info" />
    <input type="checkbox" bind:checked={showInfo} />
</label>

{#if showInfo}
    <aside transition:fade={{ duration: 300 }}>
        <h1 class="centered">Graph editor</h1>
        <p>
            This tool lets you create and edit graphs. More precisely,
            directed graphs without loops. Currently only desktop is
            properly supported.
        </p>
        <p>
            Click anywhere to create a node. Drag it with your mouse
            to move it around.
        </p>
        <p>
            Click on a node to open/close its menu. Here you can
            create edges of different kinds to other nodes. You can
            also change color and size of the node, or remove it.
        </p>
        <p>
            Click on an edge to open/close its menu. Here you can
            remove it.
        </p>
        <p class="centered">
            <button on:click={() => (showInfo = false)}>Ok</button>
        </p>
    </aside>
{/if}

<style>
    label {
        position: fixed;
        top: 15px;
        right: 15px;
    }
    label input {
        display: none;
    }
    aside {
        z-index: 100;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        box-shadow: 0px 0px 15px #0008;
        padding: 20px;
        border-radius: 12px;
        width: min(90vw, 450px);
        font-size: 20px;
        text-align: justify;
    }
    h1 {
        text-align: center;
        padding: 20px 0px;
        font-size: 44px;
        font-weight: 600;
    }
    p {
        margin: 12px 0px;
        color: #111;
    }
    button {
        cursor: pointer;
        outline: none;
        border: none;
        font-size: inherit;
        background-color: #555;
        color: white;
        padding: 5px 14px;
        border-radius: 4px;
        margin-top: 10px;
    }
    button:hover,
    button:focus {
        background-color: #000;
    }
</style>
