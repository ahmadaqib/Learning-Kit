import { JsonBranches, OrderPipeline } from './JavaScriptWorkshopVisuals';
import { ReactStateExample } from './ReactStateExample';
import { DevToolsWorkshopVisual, NpmViteWorkshopVisual } from './ToolWorkshopVisuals';
import { BoundaryTestVisual, DeploymentFlowVisual } from './WorkshopQualityVisuals';

/** Concept cards with a full-size teaching aid at every viewport. */
export function workshopVisual(name: string, alt: string, props: Record<string, unknown> = {}) {
  switch (name) {
    case 'OrderPipeline':
      return <OrderPipeline />;
    case 'JsonBranches':
      return <JsonBranches />;
    case 'ReactStateExample':
      return <ReactStateExample alt={alt} variant={props.variant === 'state' ? 'state' : 'props'} />;
    case 'BoundaryTest':
      return <BoundaryTestVisual alt={alt} props={props} />;
    case 'DeploymentFlow':
      return <DeploymentFlowVisual alt={alt} props={props} />;
    case 'NpmViteWorkshopVisual':
      return <NpmViteWorkshopVisual alt={alt} />;
    case 'DevToolsWorkshopVisual':
      return <DevToolsWorkshopVisual alt={alt} />;
    default:
      return null;
  }
}
