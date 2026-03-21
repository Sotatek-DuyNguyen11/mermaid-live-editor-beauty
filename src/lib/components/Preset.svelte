<script lang="ts">
  import Card from '$/components/Card/Card.svelte';
  import { Button } from '$/components/ui/button';
  import { getSampleDiagrams } from '$/util/mermaid';
  import { stateStore, updateCode } from '$lib/util/state';
  import { logEvent } from '$lib/util/stats';
  import ShapesIcon from '~icons/material-symbols/account-tree-outline-rounded';

  const extras = {
    ZenUML: `zenuml
    title Order Service
    @Actor Client #FFEBE6
    @Boundary OrderController #0747A6
    @EC2 <<BFF>> OrderService #E3FCEF
    group BusinessService {
      @Lambda PurchaseService
      @AzureFunction InvoiceService
    }

    @Starter(Client)
    // \`POST /orders\`
    OrderController.post(payload) {
      OrderService.create(payload) {
        order = new Order(payload)
        if(order != null) {
          par {
            PurchaseService.createPO(order)
            InvoiceService.createInvoice(order)      
          }      
        }
      }
    }
    `
  };

  const samples = { ...getSampleDiagrams(), ...extras } as const;
  const loadSampleDiagram = (diagramType: string): void => {
    updateCode(samples[diagramType], {
      resetPanZoom: true,
      updateDiagram: true
    });
    logEvent('loadSampleDiagram', { diagramType });
  };

  const mainDiagrams = [
    'Flowchart',
    'Class',
    'Sequence',
    'Entity Relationship',
    'State',
    'Mindmap'
  ];

  const diagramOrder = [
    ...mainDiagrams,
    ...Object.keys(samples)
      .filter((key) => !mainDiagrams.includes(key))
      .sort()
  ];

  const isActiveSample = (sample: string): boolean => $stateStore.code === samples[sample];
</script>

<Card title="Sample Diagrams" isOpen isStackable icon={{ component: ShapesIcon }}>
  <div class="flex h-fit max-h-52 flex-wrap gap-2 overflow-y-auto p-2">
    {#each diagramOrder as sample (sample)}
      <Button
        variant="ghost-outline"
        size="sm"
        aria-pressed={isActiveSample(sample)}
        class={[
          'w-fit min-w-20 flex-grow normal-case transition-colors',
          isActiveSample(sample) &&
            'border-accent/70 bg-accent/5 text-foreground ring-accent/15 ring-1'
        ]}
        onclick={() => loadSampleDiagram(sample)}>
        {sample}
      </Button>
    {/each}
  </div>
</Card>
