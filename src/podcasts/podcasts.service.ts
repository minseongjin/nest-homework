import { Injectable, NotFoundException } from '@nestjs/common';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];
  private episodes: Episode[] = [];
  private partialEpisodes: Episode[] = [];

  getAllPodcasts(): Podcast[] {
    return this.podcasts;
  }
  
  createPodcast(podcastData) {
    this.podcasts.push({
      id: this.podcasts.length + 1,
      ...podcastData,
    })
  }
  
  getOnePodcast(id: string): Podcast {
    const podcast = this.podcasts.find(podcast => podcast.id === +id);
    if (!podcast) {
        throw new NotFoundException(`Podcast with ID ${id} not found.`);
    }
    return podcast;
  }

  updatePodcast(id: string, podcastUpdateData) {
    const podcast = this.getOnePodcast(id);
    this.removePodcast(id);
    this.podcasts.push({...podcast, ...podcastUpdateData});
  }

  removePodcast(id: string) {
    this.getOnePodcast(id);
    this.podcasts.filter(podcast => podcast.id !== +id);
  }

  getAllEpisodes(podcastId: string): Episode[] {
    this.partialEpisodes = [];
    this.getOnePodcast(podcastId);
    this.episodes.forEach(e => {
      if(e.key === podcastId){
        this.partialEpisodes.push(e);
      }
    });
    return this.partialEpisodes;
  }

  getOneEpisode(podcastId: string, episodeId: string): Episode {
    this.partialEpisodes = this.getAllEpisodes(podcastId);
    const episode = this.partialEpisodes.find(episode => episode.id === +episodeId);
    if (!episode) {
        throw new NotFoundException(`Episode with ID ${episodeId} not found.`);
    }
    return episode;
  }

  createEpisode(podcastId: string, episodeData) {
    this.episodes.push({
      id: this.episodes.length + 1,
      key: podcastId,
      ...episodeData,
    })
  }

  updateEpisode(podcastId: string, episodeId: string, episodeUpdateData) {
    const episode = this.getOneEpisode(podcastId, episodeId);
    this.removeEpisode(podcastId, episodeId);
    this.episodes.push({...episode, ...episodeUpdateData});
  }

  removeEpisode(podcastId: string, episodeId: string) {
    this.getOneEpisode(podcastId, episodeId);
    this.episodes.filter(episode => episode.id !== +episodeId);
  }

}
