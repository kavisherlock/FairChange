import { Router, Response, NextFunction } from "express";
import { Incident, storeIncident, getIncident } from '../models/incident';
import { AugmentedRequest } from "./logging";
import { getBuckets, getUrl, fileUpload } from '../models/objectStorage';
export const router = Router();

// @ts-ignore don't know to get typescript to stop complaining about this
router.get("/getIncident/:id", async (req: AugmentedRequest, res: Response, next: NextFunction) =>
{
	req.log.debug({ incidentId: req.params.id });
	res.send(await getIncident(req.params.id));
});

// @ts-ignore don't know to get typescript to stop complaining about this
router.post("/storeIncident", async (req: AugmentedRequest, res: Response, next: NextFunction) =>
{
	const result = await storeIncident(req.body as Incident);
	req.log.debug({ result });
	res.send(result);
});

// @ts-ignore don't know to get typescript to stop complaining about this
router.get("/getBuckets", async (req: AugmentedRequest, res: Response, next: NextFunction) =>
{
	res.send(await getBuckets());
});

// @ts-ignore don't know to get typescript to stop complaining about this
router.post("/upload", async (req: AugmentedRequest, res: Response, next: NextFunction) =>
{
	const result = await fileUpload(req, res);
	// const result = await multiPartUpload(req.body.bucketName, req.body.itemName, req.body.path);

	res.send(result);
});

// @ts-ignore don't know to get typescript to stop complaining about this
router.get("/getObject/:key", async (req: AugmentedRequest, res: Response, next: NextFunction) =>
{
	const result = await getUrl(req.params.key).catch(err => err);

	res.send(result);
});


