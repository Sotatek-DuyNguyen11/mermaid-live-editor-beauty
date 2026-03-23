<script lang="ts">
  import { Toaster } from '$/components/ui/sonner/index.js';
  import { loadingStateStore } from '$/util/loading';
  import { initHandler } from '$/util/util';
  import { applyTheme } from '$lib/themes/apply-theme';
  import { activeTheme } from '$lib/themes/theme-store';
  import { syncDiagramTheme } from '$/util/state';
  import { base } from '$app/paths';
  import { ModeWatcher } from 'mode-watcher';
  import { onMount, type Snippet } from 'svelte';
  import '../app.css';

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();

  // This can be removed once https://github.com/sveltejs/kit/issues/1612 is fixed.
  // Then move it into src and vite will bundle it automatically.
  onMount(() => {
    window.addEventListener('hashchange', () => {
      void initHandler();
    });

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register(`${base}/service-worker.js`, { scope: `${base}/` })
        .then(function (registration) {
          console.log('Registration successful, scope is:', registration.scope);
        })
        .catch(function (error) {
          console.log('Service worker registration failed, error:', error);
        });
    }
  });

  $effect(() => {
    const unsubscribe = activeTheme.subscribe((theme) => {
      applyTheme(theme);
      syncDiagramTheme(theme);
    });
    return unsubscribe;
  });
</script>

<ModeWatcher />
<Toaster />

<main class="h-dvh">
  {@render children()}
</main>

{#if $loadingStateStore.loading}
  <div
    class="bg-background/80 absolute top-0 left-0 z-50 flex h-screen w-screen justify-center align-middle backdrop-blur-sm">
    <div class="text-foreground my-auto text-4xl font-bold">
      <div class="loader mx-auto"></div>
      <div>{$loadingStateStore.message}</div>
    </div>
  </div>
{/if}

<style>
  .loader {
    border: 0.45em solid var(--border);
    border-radius: 50%;
    border-top: 0.45em solid var(--primary);
    width: 3em;
    height: 3em;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
