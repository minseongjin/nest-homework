import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Controller('podcasts')
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService){

  }

  @Get()
  getAllPodcasts(): Podcast[] {
    return this.podcastsService.getAllPodcasts();
  }

  @Post()
  createPodcast(@Body() podcastData) {
    return this.podcastsService.createPodcast(podcastData);
  }

  @Get('/:id')
  getOnePodcast(@Param('id') podcastId: string): Podcast {
    return this.podcastsService.getOnePodcast(podcastId);
  }

  @Patch('/:id')
  updatePodcast(@Param('id') podcastId: string, @Body() podcastUpdateData) {
    return this.podcastsService.updatePodcast(podcastId, podcastUpdateData);
  }

  @Delete('/:id')
  removePodcast(@Param('id') podcastId: string) {
    return this.podcastsService.removePodcast(podcastId);
  }

  @Get('/:id/episodes')
  getAllEpisodes(@Param('id') podcastId: string): Episode[] {
    return this.podcastsService.getAllEpisodes(podcastId);
  }

  @Post('/:id/episodes')
  createEpisodes(@Body() episodeData) {
    return this.podcastsService.createEpisode(episodeData);
  }

  @Patch('/:id/episodes/:episodeId')
  updateEpisode(@Param('id') podcastId: string, @Param('episodeId') episodeId: string, @Body() episodeUpdateData) {
    return this.podcastsService.updateEpisode(podcastId, episodeId, episodeUpdateData);
  }

  @Delete('/:id/episodes/:episodeId')
  removeEpisode(@Param('id') podcastId: string, @Param('episodeId') episodeId: string) {
    return this.podcastsService.removeEpisode(podcastId, episodeId);
  }
}
